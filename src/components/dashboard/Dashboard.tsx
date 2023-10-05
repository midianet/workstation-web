import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"
import { Bar, Pie } from "react-chartjs-2"
import useAppData from "@/data/hook/useAppData"

Chart.register(CategoryScale);

export default function Dashboard() {
    const { theme } = useAppData()
    const textcolor = theme === 'dark' ? 'white' : 'black'
    const optionsBar = {
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        y: {
          grid: { display: false},
          ticks: { color : textcolor  , beginAtZero: true }
        },
        x: {
          grid: { display: false},          
          ticks: { color: textcolor, beginAtZero: true }
        }
      },
    }

    const optionsPie = {
      plugins: {
        legend: {
          display: false
        },
      }
    }

    const data = {
        labels: ['Java Spring Boot', '.Net C#', 'Node'],
        datasets: [
            {
              data: [28, 14, 8],
              borderColor: [
                'rgba(150, 150, 150, 1)'
              ],
              backgroundColor: [
                'rgba(20, 200, 18, 0.6)',
                'rgba(25, 150, 255, 0.6)',
                'rgba(136, 8,8, 0.6)',
              ],
              borderWidth: 2,
            }
        ],
        scales: {
          yAxes: {
              ticks: {
                  color: "#ffffff"
              },
          },
          xAxes: {
              ticks: {
                  color: "#ffffff"
              },
          }
        },

    }

    return (
      <div className="flex items-center justify-around">
        <div className="flex flex-col w-1/3 border-slate-600 border-2 rounded-lg" >
          <div className="chart-container">
            <h2 style={{ textAlign: "center", padding: '10px'  }}>Projetos por LPS</h2>
            <Bar data={data} options={optionsBar} className="bg-gray-200 dark:bg-gray-900"/>
          </div>
        </div>
        <div className="flex flex-col w-1/3" >
          <div className="chart-container">
            <h2 style={{ textAlign: "center", padding: '10px' }}>Builds no dia</h2>
              <Pie data={data} options={optionsPie} />
            </div>
        </div>
      </div>
    )

}