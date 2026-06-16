import re

import streamlit as st

EXPRESSION_PATTERN = re.compile(
    r"^\s*"
    r"(-?\d+(?:\.\d+)?)"
    r"\s*"
    r"([+\-*/])"
    r"\s*"
    r"(-?\d+(?:\.\d+)?)"
    r"\s*$"
)


def parse_expression(raw: str) -> tuple[float, str, float]:
    match = EXPRESSION_PATTERN.match(raw)
    if match is None:
        raise ValueError("Invalid expression. Use: 5 + 3 or 5+3")

    a = float(match.group(1))
    operator = match.group(2)
    b = float(match.group(3))
    return a, operator, b


def format_number(value: float) -> str:
    text = f"{value:.15f}".rstrip("0").rstrip(".")
    return text or "0"


def calculate(a: float, operator: str, b: float) -> float:
    if operator == "+":
        return a + b
    if operator == "-":
        return a - b
    if operator == "*":
        return a * b
    if operator == "/":
        if b == 0:
            raise ZeroDivisionError("Cannot divide by zero")
        return a / b
    raise ValueError(f"Unknown operator: {operator}")


def inject_custom_css() -> None:
    st.markdown(
        """
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

            .stApp {
                background-color: #f8f9fa;
                font-family: 'Inter', sans-serif;
                color: #1e293b;
            }

            .block-container {
                max-width: 680px;
                padding-top: 2.5rem;
                padding-bottom: 3rem;
            }

            #MainMenu, footer, header {
                visibility: hidden;
            }

            .app-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .app-header h1 {
                color: #1e293b;
                font-size: 2.25rem;
                font-weight: 700;
                margin: 0 0 0.5rem 0;
                letter-spacing: -0.02em;
            }

            .app-header p {
                color: #64748b;
                font-size: 1.05rem;
                margin: 0;
            }

            .calc-card {
                background: #ffffff;
                border-radius: 12px;
                padding: 1.75rem 1.75rem 1.5rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08),
                            0 10px 24px -4px rgba(0, 0, 0, 0.06);
                border: 1px solid rgba(226, 232, 240, 0.9);
                margin-bottom: 1rem;
            }

            div[data-testid="stTabs"] {
                background: #ffffff;
                border-radius: 12px;
                padding: 0.5rem 0.5rem 0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08),
                            0 10px 24px -4px rgba(0, 0, 0, 0.06);
                border: 1px solid rgba(226, 232, 240, 0.9);
            }

            div[data-testid="stTabs"] [data-baseweb="tab-list"] {
                gap: 0.25rem;
                background: #f1f5f9;
                border-radius: 10px;
                padding: 0.35rem;
            }

            div[data-testid="stTabs"] [data-baseweb="tab"] {
                border-radius: 8px;
                color: #64748b;
                font-weight: 600;
                font-size: 0.9rem;
                padding: 0.55rem 1.25rem;
                background: transparent;
            }

            div[data-testid="stTabs"] [aria-selected="true"] {
                background: #ffffff !important;
                color: #1e293b !important;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
            }

            div[data-testid="stTabs"] [data-baseweb="tab-panel"] {
                padding: 1.5rem 1.25rem 1.25rem;
            }

            div[data-testid="stTabs"] label,
            div[data-testid="stNumberInput"] label,
            div[data-testid="stSelectbox"] label,
            div[data-testid="stTextInput"] label {
                color: #1e293b !important;
                font-weight: 600 !important;
                font-size: 0.875rem !important;
            }

            div[data-testid="stNumberInput"] input,
            div[data-testid="stTextInput"] input,
            div[data-baseweb="select"] > div {
                border-radius: 8px !important;
                border-color: #e2e8f0 !important;
                color: #1e293b !important;
            }

            div[data-testid="stFormSubmitButton"] > button,
            div[data-testid="stButton"] > button {
                width: 100%;
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
                color: #ffffff !important;
                border: none !important;
                border-radius: 10px !important;
                padding: 0.8rem 1.5rem !important;
                font-weight: 600 !important;
                font-size: 1rem !important;
                letter-spacing: 0.01em;
                transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease !important;
                box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
            }

            div[data-testid="stFormSubmitButton"] > button:hover,
            div[data-testid="stButton"] > button:hover {
                background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%) !important;
                transform: scale(1.02);
                box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
            }

            div[data-testid="stFormSubmitButton"] > button:active,
            div[data-testid="stButton"] > button:active {
                transform: scale(0.99);
            }

            .alert {
                padding: 1rem 1.25rem;
                border-radius: 10px;
                margin-top: 1.25rem;
                font-size: 1.05rem;
                font-weight: 600;
                color: #1e293b;
                line-height: 1.5;
            }

            .alert-success {
                background-color: #ecfdf5;
                border-left: 5px solid #10b981;
                box-shadow: 0 1px 3px rgba(16, 185, 129, 0.12);
            }

            .alert-error {
                background-color: #fef2f2;
                border-left: 5px solid #ef4444;
                box-shadow: 0 1px 3px rgba(239, 68, 68, 0.12);
                color: #991b1b;
            }

            .alert-label {
                display: block;
                font-size: 0.75rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                margin-bottom: 0.35rem;
                opacity: 0.85;
            }

            .alert-success .alert-label {
                color: #059669;
            }

            .alert-error .alert-label {
                color: #dc2626;
            }
        </style>
        """,
        unsafe_allow_html=True,
    )


def show_success(message: str) -> None:
    st.markdown(
        f"""
        <div class="alert alert-success">
            <span class="alert-label">Result</span>
            {message}
        </div>
        """,
        unsafe_allow_html=True,
    )


def show_error(message: str) -> None:
    st.markdown(
        f"""
        <div class="alert alert-error">
            <span class="alert-label">Error</span>
            {message}
        </div>
        """,
        unsafe_allow_html=True,
    )


def main() -> None:
    st.set_page_config(page_title="Calculator", page_icon="🧮", layout="centered")
    inject_custom_css()

    st.markdown(
        """
        <div class="app-header">
            <h1>Simple Calculator</h1>
            <p>Add, subtract, multiply, or divide two numbers.</p>
        </div>
        """,
        unsafe_allow_html=True,
    )

    tab_fields, tab_expression = st.tabs(["Fields", "Expression"])

    with tab_fields:
        st.markdown('<div class="calc-card">', unsafe_allow_html=True)

        col1, col2, col3 = st.columns([2, 1, 2])
        with col1:
            a = st.number_input("First number", value=0.0, step=1.0, key="operand_a")
        with col2:
            operator = st.selectbox("Operator", ["+", "-", "*", "/"], key="operator")
        with col3:
            b = st.number_input("Second number", value=0.0, step=1.0, key="operand_b")

        if st.button("Calculate", type="primary", key="calculate_fields"):
            try:
                result = calculate(a, operator, b)
                show_success(
                    f"{format_number(a)} {operator} {format_number(b)} = {format_number(result)}"
                )
            except ZeroDivisionError as exc:
                show_error(str(exc))

        st.markdown("</div>", unsafe_allow_html=True)

    with tab_expression:
        st.markdown('<div class="calc-card">', unsafe_allow_html=True)

        with st.form("expression_form", clear_on_submit=False):
            expression = st.text_input(
                "Enter an expression",
                placeholder="5 + 3 or 5+3",
            )
            submitted = st.form_submit_button("Calculate", type="primary")

        if submitted:
            try:
                a, operator, b = parse_expression(expression)
                result = calculate(a, operator, b)
                show_success(
                    f"{format_number(a)} {operator} {format_number(b)} = {format_number(result)}"
                )
            except ValueError as exc:
                show_error(str(exc))
            except ZeroDivisionError as exc:
                show_error(str(exc))

        st.markdown("</div>", unsafe_allow_html=True)


if __name__ == "__main__":
    main()
