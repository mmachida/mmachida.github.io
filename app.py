import streamlit as st

st.title("Calculadora de Soma")

# Entradas
a = st.number_input("Digite o primeiro número:", value=0.0)
b = st.number_input("Digite o segundo número:", value=0.0)

# Botão para calcular
if st.button("Somar"):
    resultado = a + b
    st.success(f"Resultado: {resultado}")
