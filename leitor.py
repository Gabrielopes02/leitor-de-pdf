import json
from pypdf import PdfReader

# 1. Carrega o arquivo PDF de teste
pdf_path = "teste.pdf"  # Certifique-se de que o seu PDF está na mesma pasta
reader = PdfReader(pdf_path)

dados_pdf = {
    "nomeDoArquivo": pdf_path,
    "totalPaginas": len(reader.pages),
    "paginas": []
}

# 2. Extrai e estrutura o texto
for index, page in enumerate(reader.pages):
    numero_pagina = index + 1
    texto_bruto = page.extract_text()
    
    # Limpa as linhas removendo espaços em branco extras
    linhas = [line.strip() for line in texto_bruto.split('\n') if line.strip()]
    
    dados_pdf["paginas"].append({
        "pagina": numero_pagina,
        "totalLinhas": len(linhas),
        "linhas": linhas
    })

# 3. Salva o JSON final formatado
with open("dados_pdf.json", "w", encoding="utf-8") as f:
    json.dump(dados_pdf, f, indent=4, ensure_ascii=False)

print("✅ Sucesso! O arquivo 'dados_pdf.json' foi gerado.")
