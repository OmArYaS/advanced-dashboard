const labels = [
  "aa",
  "bb",
  "dd",
  "ee",
  "ff",
  "bb",
  "dd",
  "ee",
  "ff",
  "bb",
  "dd",
  "ee",
  "ff",
];
const values = [10, 20, 4, 5, 33, 20, 4, 5, 33, 20, 4, 5, 33];

// إعداد التدرج اللوني
const ctx = document.getElementById("myChart-line").getContext("2d");
const gradient = ctx.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "rgb(245, 131, 182,0.2)"); // البنفسجي
gradient.addColorStop(1, "rgb(73, 177, 250,0.2)"); // الأزرق
const gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
gradient2.addColorStop(0, "#f39bd7"); // البنفسجي
gradient2.addColorStop(1, "#49b1fa"); // الأزرق

// إعداد بيانات الرسم البياني
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Air Quality",
        data: values,
        backgroundColor: gradient,
        borderColor: gradient2, // لون البنفسجي للخط
        borderWidth: 2,
        // color:"rgba(255,255,255)",
        fill: true, // لملء المنطقة تحت الخط
      },
    ],
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false, // إخفاء الشبكة الرأسية
        },
      },
      y: {
        grid: {
          display: true,
          borderDash: [5, 5], // خطوط متقطعة للشبكة الأفقية
        },
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4, // جعل الخط منحنيًا (شبه الموجة)
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "rgba(75, 0, 130, 1)",
        },
      },
    },
  },
});



const labels2 = ["aa", "bb", "dd", "ee"];
const values2 = [10, 20, 4, 5];

// إعداد التدرج اللوني
const myChartPie = document.getElementById("myChart-pie").getContext("2d");

// إعداد بيانات الرسم البياني
const myChartOn = new Chart(myChartPie, {
  type: "doughnut", // تغيير النوع إلى "doughnut" لرسم قطاع دائري مع ثقب
  data: {
    labels: labels2,
    datasets: [
      {
        data: values2,
        backgroundColor: ["#f26391", "#54d2d1", "#f8404a", "#fc993c"],
        borderColor: ["#f26391", "#54d2d1", "#f8404a", "#fc993c"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true, // يجعل الرسم البياني يستجيب لتغيير الحجم
    maintainAspectRatio: false, // إلغاء الحفاظ على نسبة العرض إلى الارتفاع
    cutout: "70%", // جعل الرسم البياني نحيفًا بتوسيع الثقب الداخلي
    plugins: {
      legend: {
        display: false, // تعطيل عرض الـ legend
      },
      tooltip: {
        enabled: false, // تعطيل عرض الـ tooltip
      },
    },
  },
  plugins: [
    {
      id: "custom-text",
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#b4c5d7";
        var text = "today",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ],
});
