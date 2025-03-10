import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importar el plugin de etiquetas de datos
import { useTiming } from '../hooks/useTiming';
import Swal from 'sweetalert2';

// Registramos el plugin de etiquetas de datos
Chart.register(ChartDataLabels);

const ReportePDFNew = ({ incidencias }) => {
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const {agregandoDataCronometrada} = useTiming()
    // Contar incidencias por cada aplicación
    const incidenciasPorAplicacion = incidencias.reduce((acc, incidencia) => {
        const appName = incidencia.app.name_app;
        if (acc[appName]) {
            acc[appName] += 1;
        } else {
            acc[appName] = 1;
        }
        return acc;
    }, {});

    const incidenciasPorAplicacionKeys = Object.keys(incidenciasPorAplicacion)
    const incidenciasPorAplicacionValues = Object.values(incidenciasPorAplicacion)

    // Contar incidencias por cada usuario
    const incidenciasPorUsuario = incidencias.reduce((acc, incidencia) => {
        const username = incidencia.user.username;
        if (acc[username]) {
            acc[username] += 1;
        } else {
            acc[username] = 1;
        }
        return acc;
    }, {});

    const incidenciasPorUsuarioKeys = Object.keys(incidenciasPorUsuario)
    const incidenciasPorUsuarioValues = Object.values(incidenciasPorUsuario)

    // Función para generar un color aleatorio en formato RGBA
    function generarColorAleatorio() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.8)`;
    }


    const generatePDF = async () => {
        var timer = setInterval(() => {
            setSeconds(seconds + 1)
            if (seconds === 59) {
                setMinutes(minutes + 1)
                setSeconds(0)
            }

        }, 1000)
        // Crear un nuevo documento PDF con orientación horizontal (landscape)
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Crear canvas temporales para los gráficos (no visibles en la interfaz)
        const pieChartCanvas = document.createElement('canvas');
        pieChartCanvas.width = 800;
        pieChartCanvas.height = 500;
        pieChartCanvas.style.display = 'none';
        document.body.appendChild(pieChartCanvas);

        const barChartCanvas = document.createElement('canvas');
        barChartCanvas.width = 800;
        barChartCanvas.height = 400;
        barChartCanvas.style.display = 'none';
        document.body.appendChild(barChartCanvas);

        // Datos para el gráfico de pastel
        const pieData = {
            labels: incidenciasPorAplicacionKeys,
            datasets: [{
                data: incidenciasPorAplicacionValues,
                backgroundColor: [],
                borderWidth: 1
            }]
        };

        // Generar un color por cada label
        pieData.labels.forEach((label, index) => {
            // Si hay más etiquetas que colores predefinidos, generamos nuevos colores aleatorios
            pieData.datasets[0].backgroundColor.push(generarColorAleatorio());
        });


        // Datos para el gráfico de barras
        const barData = {
            labels: incidenciasPorUsuarioKeys,
            datasets: [{
                label: 'Incidencias Antendidas por Trabajadores',
                data: incidenciasPorUsuarioValues,
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }]
        };

        // Crear el gráfico de pastel
        const pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: pieData,
            options: {
                responsive: false,
                animation: false, // Desactivar animaciones
                plugins: {
                    title: {
                        display: true,
                        text: 'Incidencias por Aplicación',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'right'
                    }
                }
            }
        });

        // Crear el gráfico de barras
        const barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: barData,
            options: {
                responsive: false,
                animation: false, // Desactivar animaciones
                plugins: {
                    title: {
                        display: true,
                        text: 'Incidencias atendidas por trabajador',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'top'
                    },
                    datalabels: {
                        display: true, // Habilitar el mostrar las etiquetas
                        color: 'black', // Color de las etiquetas
                        font: {
                            weight: 'bold',
                            size: 12
                        },
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => value // Muestra el valor sobre la barra
                    }
                }
            }
        });

        // Esperar a que los gráficos se rendericen completamente
        await new Promise(resolve => setTimeout(resolve, 100));

        try {
            // Agregar el gráfico de pastel a la primera página
            const pieChartImg = pieChartCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(pieChartImg, 'PNG', 15, 30, 270, 150);

            // Agregar una nueva página para el gráfico de barras
            pdf.addPage('a4', 'landscape');
            const barChartImg = barChartCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(barChartImg, 'PNG', 15, 30, 270, 150);

            // Descargar el PDF
            const response = pdf.save('reporte-incidencias.pdf');
            if (response) {
                const datosTiming = {
                    origen: 'ereporte',
                    tiempo: `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} `
                }

                //insertamos el tiempo de 
                const { data: resultTiming } = await agregandoDataCronometrada(datosTiming);

                Swal.fire({
                    title: 'PFD descargado correctamente',
                    text: `La generacion del PDF tomó ${resultTiming.data[0].tiempo}`,
                    icon: 'success',
                    timer: 4000,

                })
                clearInterval(timer)
            }
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            alert('Hubo un error al generar el PDF. Por favor, intente nuevamente.');
        } finally {
            // Destruir los gráficos
            pieChart.destroy();
            barChart.destroy();

            // Eliminar los canvas temporales
            document.body.removeChild(pieChartCanvas);
            document.body.removeChild(barChartCanvas);
        }
    };

    return (


        <button onClick={generatePDF} className='  h-full text-white bg-regal-blue hover:bg-hover-regal rounded-md p-3 font-bold'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
            </svg>

        </button>
    );
};

export default ReportePDFNew;

//ReportePDFNew