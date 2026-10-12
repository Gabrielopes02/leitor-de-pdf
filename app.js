   pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cloudflare.com';

        document.getElementById('pdf-file').addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerText = "Carregando e extraindo texto...";

            // 1. Converte o arquivo carregado em uma ArrayBuffer
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                const typedarray = new Uint8Array(this.result);

                try {
                    // 2. Carrega o documento PDF
                    const pdf = await pdfjsLib.getDocument(typedarray).promise;
                    let textoCompleto = '';

                    // 3. Percorre todas as páginas do PDF
                    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                        const page = await pdf.getPage(pageNum);
                        
                        // 4. Extrai o conteúdo de texto da página
                        const textContent = await page.getTextContent();
                        
                        // 5. Junta as strings das linhas da página
                        const textoPagina = textContent.items.map(item => item.str).join(' ');
                        textoCompleto += `--- Página ${pageNum} ---\n${textoPagina}\n\n`;
                    }

                    // Exibe o resultado na tela
                    resultadoDiv.innerText = textoCompleto;

                } catch (error) {
                    console.error("Erro ao ler o PDF:", error);
                    resultadoDiv.innerText = "Erro ao processar o arquivo PDF.";
                }
            };

            fileReader.readAsArrayBuffer(file);
            
        });