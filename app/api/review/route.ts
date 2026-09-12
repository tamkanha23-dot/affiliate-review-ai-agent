import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { product } = await request.json();

    if (!product || !product.trim()) {
      return NextResponse.json(
        { error: "กรุณาระบุข้อมูลสินค้า" },
        { status: 400 }
      );
    }

    const prompt = `
คุณคือ AI Affiliate Marketing Assistant
ผู้เชี่ยวชาญด้านการรีวิวสินค้าและสร้างคอนเทนต์ขายสินค้าออนไลน์

วิเคราะห์ข้อมูลสินค้าต่อไปนี้:

${product}

สร้างผลลัพธ์เป็นภาษาไทย โดยมีหัวข้อ:

1. วิเคราะห์สินค้า
2. จุดเด่น
3. จุดที่ควรพิจารณา
4. กลุ่มลูกค้าเป้าหมาย
5. คะแนนความน่าสนใจสินค้า /10
6. รีวิวสินค้าแบบน่าเชื่อถือ
7. สคริปต์ TikTok/Reels ความยาวประมาณ 30 วินาที
8. Caption สำหรับโพสต์
9. Call to Action
10. Hashtags 10 รายการ

ข้อกำหนดสำคัญ:
- ห้ามแต่งข้อมูลที่ไม่ได้ระบุ
- ห้ามรับรองผลลัพธ์เกินจริง
- หากข้อมูลไม่เพียงพอ ให้ระบุว่า "ไม่มีข้อมูลเพียงพอ"
- แยกข้อเท็จจริงออกจากความคิดเห็น
- เขียนให้น่าสนใจ แต่ไม่หลอกลวงผู้บริโภค
- ใส่ข้อความเปิดเผยว่าเป็น Affiliate เมื่อมีการใช้ลิงก์ Affiliate
`;

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: prompt,
    });

    return NextResponse.json({
      result: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "ไม่สามารถเชื่อมต่อ AI ได้ กรุณาตรวจสอบ OPENAI_API_KEY" },
      { status: 500 }
    );
  }
}
