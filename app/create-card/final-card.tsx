"use client";

interface authFunction {
  sedAuthData: () => void;
}

export default function FinalSubmitButton({ sedAuthData }: authFunction) {
  return (
    <>
      <span className="text-black font-vazir text-xl">
        می‌توانید در هر زمان اطلاعات کارت خود را مشاهده یا ویرایش کنید. برای
        افزودن کارت جدید یا بازگشت به داشبورد، از منوی بالا استفاده کنید.
      </span>
      <button
        className="bg-black text-white py-2 px-4 rounded-lg"
        onClick={sedAuthData}
      >
        ثبت نهایی کارت
      </button>
    </>
  );
}
