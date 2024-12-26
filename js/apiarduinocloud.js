// بيانات الوصول إلى API
const clientId = "YvKs6ks1HNkrjNCtRadLEDgFZdp6cQLQ";
const clientSecret =
  "rQwsEt64mbCl8GciEAV3l01He2rtuxGqNJLW6oYSx2HBj3GoNsqu5GuaGdh5HIBq";

// نهايات الـ API لكل متغير
const endpoints = {
  soilMoisture:
    "https://api.arduino.cc/v2/56cf4764-85cb-445f-9e9c-6cc430a9cf3c/soilMoisture",
  temperature:
    "https://api.arduino.cc/v2/829284d0-da15-497c-b755-641acd108274/temperature",
};

// دالة لجلب بيانات من الـ API
async function fetchData(endpoint) {
    try {
        // استدعاء الـ API مع المصادقة
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${clientId}:${clientSecret}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// استدعاء الدالة لجلب بيانات الرطوبة في التربة وعرضها
fetchData(endpoints.soilMoisture)
    .then(data => {
        if (data) {
            console.log('Soil Moisture:', data.value);
            // عرض القيمة في واجهة المستخدم (UI)
            document.getElementById('soil-moisture').innerText = `Soil Moisture: ${data.value}`;
        }
    })
    .catch(error => {
        console.error('Error getting soil moisture:', error);
    });

// استدعاء الدالة لجلب بيانات درجة الحرارة وعرضها
fetchData(endpoints.temperature)
    .then(data => {
        if (data) {
            console.log('Temperature:', data.value);
            // عرض القيمة في واجهة المستخدم (UI)
            document.getElementById('temperature').innerText = `Temperature: ${data.value}`;
        }
    })
    .catch(error => {
        console.error('Error getting temperature:', error);
    });

