
"use client";

import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateReview() {
    if (!product.trim()) {
      alert("กรุณาใส่ชื่อสินค้าหรือรายละเอียดสินค้า");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ product })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "เกิดข้อผิดพลาด");
      }

      setResult(data.result);
    } catch (error) {
      setResult(
        error instanceof Error
          ? error.message
          : "ไม่สามารถสร้างรีวิวได้"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          🤖 AI Affiliate Review Agent
        </h1>

        <p style={{ color: "#555", marginBottom: "30px" }}>
          ระบบ AI ช่วยวิเคราะห์สินค้าและสร้างคอนเทนต์ Affiliate
        </p>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 5px 20px rgba(0,0,0,.08)"
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            สินค้าที่ต้องการรีวิว
          </label>

          <textarea
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="เช่น เจลกำจัดมด ยี่ห้อ..., ราคา..., จุดเด่น..., ลิงก์สินค้า..."
            rows={7}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxSizing: "border-box",
              resize: "vertical"
            }}
          />

          <button
            onClick={generateReview}
            disabled={loading}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: loading ? "#999" : "#111827",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading
              ? "🤖 AI กำลังวิเคราะห์..."
              : "✨ สร้างรีวิวด้วย AI"}
          </button>
        </div>

        {result && (
          <div
            style={{
              marginTop: "25px",
              background: "#fff",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 5px 20px rgba(0,0,0,.08)",
              whiteSpace: "pre-wrap",
              lineHeight: "1.7"
            }}
          >
            <h2>📄 ผลลัพธ์จาก AI</h2>
            <div>{result}</div>
          </div>
        )}
      </div>
    </main>
  );
}
