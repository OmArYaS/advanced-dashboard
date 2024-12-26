// الحصول على العنصر الرئيسي من خلال الـ id
var volume = document.getElementById("volume");
var  pers = 80;
var showPers = document.getElementById("pers");
showPers.textContent=pers + "%"


// إنشاء العناصر الجديدة وإضافتها داخل العنصر الرئيسي
for (var i = 1; i <= 26; i++) {
  // إنشاء عنصر جديد (مثلاً عنصر div)
  var newElement = document.createElement("div");
  
  
  if(i<= (pers/100)*26){
  var colorValue = i * (255 / 25); // يتم تقسيم 255 (المدى الكامل للألوان RGB) على 25 للحصول على تدرج الألوان

  // تعيين اللون كخلفية للعنصر
  newElement.style.backgroundColor =
    "rgb(" +
    Math.round(colorValue) +
    ", " +
    Math.round(255 - colorValue) +
    ", 0)"; // تدرج ألوان من الأخضر إلى الأحمر

  // تعيين نص داخل العنصر الجديد
  //   newElement.textContent = i;
  }else{
    newElement.style.backgroundColor = "#3e4a60";
  }
  // إضافة العنصر الجديد إلى العنصر الرئيسي
  volume.appendChild(newElement);
}
