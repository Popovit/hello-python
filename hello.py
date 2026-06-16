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


def main() -> None:
    st.set_page_config(page_title="Calculator", page_icon="🧮", layout="centered")
    st.title("Simple Calculator")
    st.caption("Add, subtract, multiply, or divide two numbers.")

    tab_fields, tab_expression = st.tabs(["Fields", "Expression"])

    with tab_fields:
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
                st.success(
                    f"**{format_number(a)} {operator} {format_number(b)} = {format_number(result)}**"
                )
            except ZeroDivisionError as exc:
                st.error(str(exc))

    with tab_expression:
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
                st.success(
                    f"**{format_number(a)} {operator} {format_number(b)} = {format_number(result)}**"
                )
            except ValueError as exc:
                st.error(str(exc))
            except ZeroDivisionError as exc:
                st.error(str(exc))


if __name__ == "__main__":
    main()
