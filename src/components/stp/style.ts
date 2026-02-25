import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  BarElement,
} from 'chart.js';
import { ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title, BarElement,);

export const data: ChartData<'doughnut', number[], string> = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: '# of Votes',
      data: [30, 30, 30, 30, 30],
      backgroundColor: ['transparent', '#0FFF50', '#0FFF50', '#0FFF50', '#0FFF50'],
      borderColor: '#36454F',
      borderWidth: 4,
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      display: false,
    },
  },
};
// Global variable to track icon hitboxes
const iconHitboxes: { x: number; y: number; size: number }[] = [];

export const centerBackgroundPlugin = {
  id: 'centerBackgroundWithIcons',
  beforeDatasetsDraw(chart: any) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta?.data?.length) return;

    const centerX = chart.width / 2;
    const centerY = chart.height / 2;
    const innerRadius = meta.data[0].innerRadius;

    // Draw center circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.restore();

    // Draw center text
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AUTO', centerX, centerY);
    ctx.restore();

    // ✅ SVG Icons
    const icons = [
      // Settings icon (filled white)
      ` `,

      // Clock icon
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M13 3h-2v10h2V3zm5.66 3.34l-1.41 1.41A7.975 7.975 0 0 1 20 13c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-2.21.9-4.21 2.34-5.66l-1.41-1.41A9.953 9.953 0 0 0 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"/>
      </svg>`,

      // Lock filled icon
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M12 17a1.5 1.5 0 0 0 0-3 1.5 1.5 0 0 0 0 3zm6-6V9a6 6 0 0 0-12 0v2a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-2 0H8V9a4 4 0 1 1 8 0v2z"/>
      </svg>`,

      // Settings icon outline
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.7 0 1.31-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.06a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .7.4 1.31 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.06c.2.6.81 1 1.51 1H21a2 2 0 1 1 0 4h-.09c-.7 0-1.31.4-1.51 1z"/>
      </svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm8.94-2.81l-1.36-1.05a7.8 7.8 0 0 0 0-1.28l1.36-1.05a.5.5 0 0 0 .11-.65l-1.5-2.6a.5.5 0 0 0-.61-.22l-1.61.65a7.77 7.77 0 0 0-1.1-.64l-.24-1.72a.5.5 0 0 0-.5-.43h-3a.5.5 0 0 0-.5.43l-.24 1.72a7.77 7.77 0 0 0-1.1.64l-1.61-.65a.5.5 0 0 0-.61.22l-1.5 2.6a.5.5 0 0 0 .11.65l1.36 1.05a7.8 7.8 0 0 0 0 1.28l-1.36 1.05a.5.5 0 0 0-.11.65l1.5 2.6a.5.5 0 0 0 .61.22l1.61-.65c.34.24.71.46 1.1.64l.24 1.72a.5.5 0 0 0 .5.43h3a.5.5 0 0 0 .5-.43l.24-1.72c.39-.18.76-.4 1.1-.64l1.61.65a.5.5 0 0 0 .61-.22l1.5-2.6a.5.5 0 0 0-.11-.65z"/>
      </svg>`,
    ];

    iconHitboxes.length = 0;

    meta.data.slice(0, icons.length).forEach((arc: any, index: number) => {
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const radius = (arc.outerRadius + arc.innerRadius) / 2;
      const x = arc.x + Math.cos(angle) * radius;
      const y = arc.y + Math.sin(angle) * radius;

      const size = 24;
      iconHitboxes.push({ x: x - size / 2, y: y - size / 2, size });

      const img = new Image();
      img.src = 'data:image/svg+xml;base64,' + btoa(icons[index]);
      img.onload = () => {
        ctx.save();
        ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
        ctx.restore();
      };
    });

    // Attach click event handler once
    if (!chart._iconClickHandlerAdded) {
      chart.canvas.addEventListener('click', (e: MouseEvent) => {
        const rect = chart.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        iconHitboxes.forEach((box, index) => {
          if (
            x >= box.x &&
            x <= box.x + box.size &&
            y >= box.y &&
            y <= box.y + box.size
          ) {
            alert(`Hi from icon ${index + 1}`);
          }
        });
      });
      chart._iconClickHandlerAdded = true;
    }
  },
};

//   HORIZONTAL BAR CHART
export const horizontalBarData = {
  labels: ["90-100", "75-90", "60-75", "45-60", "30-45", "15-30", "0-15",],
  datasets: [
    {
      label: 'Performance',
      data: ["", "", "", "", 10, 20, 80],
      backgroundColor: [
        'transparent',
        'transparent', // 1st bar color
        'transparent', // 2nd bar color
        'transparent', // 3rd bar color
        '#afe1af', // 4th bar color
        "#d4efd4",     // 5th bar color (light green)
        "#c2e8c2"      // 6th bar color (lighter green)
      ],
    },
  ],
};

// Horizontal bar chart options
export const horizontalBarOptions = {
  indexAxis: 'y' as const, // makes the bars horizontal
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {

      beginAtZero: true,
      max: 60,
      ticks: {
        stepSize: 20,
        color: "white",
        font: {
          size: 7, // Set the font size of the ticks (make them small)
        },

      },
      grid: {
        drawOnChartArea: false,
        drawBorder: false,
      },
      border: {
        display: true, // Keep the x-axis visible
        color: "#AFE1AF",
        width: 2, // Line thickness of the x-axis
      },
      title: {
        display: true,
        text: "Run Hours (%)",
        color: "white",
        font: {
          size: 8, // Set the font size of the ticks (make them small)
        },
      },
    },

    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: "white",
        stepSize: 0,
        font: {
          size: 3, // Set the font size of the ticks (make them small)
        },
      },
      border: {
        display: true, // Keep the x-axis visible
        color: "#AFE1AF",
        width: 2, // Line thickness of the x-axis
      },
      grid: {
        drawOnChartArea: false,
        drawBorder: false,

      },
      // Avoid any offset or additional padding

      title: {
        display: true,
        text: "Dimand (%)",
        color: 'white',
        font: {
          size: 8, // Set the font size of the ticks (make them small)
        },
      },
      barThickness: 50,          // Set fixed thickness of bars
      categoryPercentage: 1.0,   // Use full width for each category (no space between bars)
      barPercentage: 1.0,       // Use full width for each bar
      offset: false,            // Avoid any offset or additional padding
      min: 0,                   // Start at 0 (no space below)
      stacked: true,
    },

  },
};

type User = {
  eqtype: string;
  name: string;
};

export const users: User[] = [
  { eqtype: 'Cooling Towers', name: 'No Cooling Tower Alarms' },
  { eqtype: 'Chillers', name: 'No Chiller Alarms' },
  { eqtype: 'Pumps', name: 'No Pump Alarms' },
];
type Comm = {
  network: string;
  status: string;
  faults: number;
};

export const comm: Comm[] = [
  { network: 'NlagaraNetwork', status: 'Ok', faults: 0 },
  { network: 'ModbusAsyncNtwork', status: 'Fault', faults: 0 },
  { network: 'BacnetNetwork', status: 'Ok', faults: 0 },
];

export const Doughnutdata: ChartData<'doughnut', number[], string> = {
  labels: ['Red', 'Blue', 'Yellow',],
  datasets: [
    {
      label: '# of Votes',
      data: [50, 30, 54,],
      backgroundColor: ["black", "#71797E", "#F0F8FF"],
      borderColor: '#36454F',
      borderWidth: 2,
    },
  ],
};

export const Doughnutoptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
  },
};
export const DoughnutPlugin = {
  id: 'centerBackgroundWithIcons',
  afterDatasetsDraw(chart: any) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta?.data?.length) return;

    const centerX = chart.width / 2;
    const centerY = chart.height / 2;

    // === 1. Center Text ===
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('9.4°C', centerX, centerY);
    ctx.restore();

    // === 2. Label on gray segment (2nd slice) ===
    const grayArc = meta.data[1]; // Index 1 = gray segment
    const angle = (grayArc.startAngle + grayArc.endAngle) / 2;
    const radius = (grayArc.innerRadius + grayArc.outerRadius) / 2;

    const labelX = grayArc.x + Math.cos(angle) * radius;
    const labelY = grayArc.y + Math.sin(angle) * radius;

    ctx.save();
    ctx.fillStyle = '#6CB4EE'; // Black text for contrast
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('9.4°C', labelX, labelY);
    ctx.restore();
  }
};

export const linegraph: ChartData<'line'> = {
  labels: ["16.00", "20.00", "1 Sep", "04.00", "08.00", "12.00", "16.00"],
  datasets: [
    {
      label: 'Temperature',
      data: [4, 5, 8, 7, 1, 3, 8],
      fill: false,
      borderColor: '#d98b19',
      backgroundColor: '#00BFFF',
      tension: 0.2,
    },
  ],
};

export const lineoptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      labels: {
        color: '#fff',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#fff',
        minRotation: 0,
        maxRotation: 0,
      },
      grid: {
        drawOnChartArea: false,
      },
      border: {
        display: true,
        color: 'white',
        width: 1,
      },
    },

    y: {
      min: 1.0,
      max: 9.0,
      ticks: {
        stepSize: 1,
        color: '#fff',
        callback: (value: number | string) => Number(value).toFixed(1),
      },
      grid: {
        drawOnChartArea: false, // removes vertical grid lines
      },
      border: {
        display: true,
        color: 'white',
        width: 1,
      },
      title: {
        display: true,
        text: 'COP',
        color: 'white',
        font: {
          size: 10,
        },
      },
    }

  },
}
export const linegraphs: ChartData<'line'> = {
  labels: ["16.00", "20.00", "1 Sep", "04.00", "08.00", "12.00", "16.00"],
  datasets: [
    {
      label: 'Temperature',
      data: [361, 3610, 361, 3610, 1053, 2166, 361],
      fill: false,
      borderColor: '#d98b19',
      backgroundColor: '#00BFFF',
      tension: 0.5,
    },
  ],
};

export const lineoption: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      labels: {
        color: '#fff',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#fff',
        minRotation: 0,
        maxRotation: 0,
      },
      grid: {
        drawOnChartArea: false,
      },
      border: {
        display: true,
        color: 'white',
        width: 1,
      },
    },

    y: {
      min: 0.0,
      max: 3971.0,
      ticks: {
        stepSize: 1,
        color: '#fff',
        callback: (value: number | string) => Number(value).toFixed(1),
      },
      grid: {
        drawOnChartArea: false, // removes vertical grid lines
      },
      border: {
        display: true,
        color: 'white',
        width: 1,
      },
      title: {
        display: true,
        text: 'COP',
        color: 'white',
        font: {
          size: 10,
        },
      },
    }

  },
}