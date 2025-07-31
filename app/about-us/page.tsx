import { title } from "@/components/primitives";

export default function AboutUs() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-1 font-vazir text-[20px] ">
        <p className="text-green-600">کارتبوک</p>
        <p className="text-yellow-400">درباره </p>
      </div>
      <span className="font-vazir  text-lg  text-black   ">
        کارتبوک یک پلتفرم ساده و هوشمند برای ثبت و مدیریت کارت‌های بانکی شماست.
        ما اینجا هستیم تا فرآیند ذخیره، اعتبارسنجی و سازماندهی کارت‌ها رو برای
        کاربران راحت‌تر، سریع‌تر و امن‌تر کنیم. در کارتبوک، تمرکز ما روی تجربه‌ی
        کاربری روان، طراحی مینیمال و امنیت اطلاعات شماست. چه در حال اضافه کردن
        کارت جدید باشید، چه در حال مشاهده‌ی کارت‌های ذخیره‌شده، همیشه می‌تونید
        روی عملکرد دقیق و سریع کارتبوک حساب کنید. با کارتبوک، دیگه نیاز نیست
        نگران فراموشی یا تداخل شماره کارت‌ها باشید — همه چیز در یک‌جا، به‌سادگی
        قابل دسترسیه.
      </span>
    </div>
  );
}
