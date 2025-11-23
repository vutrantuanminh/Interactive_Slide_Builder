# Slide Builder - Developer Guide

## 1. Tech Stack
- **Frontend:** Next.js 14+ (App Router)
- **Core Editor:** UniverJS
- **Backend/Database:** Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Styling:** Tailwind CSS

## 2. Kiến trúc Dữ liệu (The "JSON Strategy")
Chúng ta không lưu từng shape/text vào các bảng SQL riêng biệt.
Toàn bộ nội dung slide (biến `SLIDE_DATA` trong UniverJS) được lưu vào cột `content` (kiểu `JSONB`) trong bảng `projects`.

**Luồng dữ liệu:**
`Frontend (Univer Instance) <-> JSON <-> Supabase (Project Table)`

## 3. Setup Dự án

### 3.1. Biến môi trường
Tạo file `.env.local`:
```bash

NEXT_PUBLIC_SUPABASE_URL=https://nibgukzlvdfliuntsxxz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pYmd1a3psdmRmbGl1bnRzeHh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MjcxODgsImV4cCI6MjA3OTQwMzE4OH0.pyKRTdLlGqfzqOuXnjWK4XI2bx-Q5eDe8jkVxZfNSSQ

```

### 3.2. Cài đặt Client
```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 4. Hướng dẫn Implement các tính năng chính

### A. Authentication (Đăng nhập/Đăng ký)
Không cần gọi API backend tự viết. Sử dụng trực tiếp Supabase Client ở Frontend.
```javascript
const supabase = createClientComponentClient()
// Đăng nhập Github
await supabase.auth.signInWithOAuth({ provider: 'github' })
// Lấy user hiện tại
const { data: { user } } = await supabase.auth.getUser()
```

### B. Load Dự án (Vào trang Editor)
```javascript
// Lấy nội dung JSON từ Supabase
const { data, error } = await supabase
  .from('projects')
  .select('content')
  .eq('id', projectId)
  .single()

// Nạp vào UniverJS
if (data) {
  univer.createUnit(UniverInstanceType.UNIVER_SLIDE, data.content);
}
```

### C. Lưu Dự án (Save)
```javascript
// 1. Trích xuất JSON từ UniverJS
const currentData = univerInstance.save(); 

// 2. Gửi lên Supabase
await supabase
  .from('projects')
  .update({ content: currentData, updated_at: new Date() })
  .eq('id', projectId)
```

### D. Upload Ảnh
1. Upload file lên Supabase Storage bucket `slide-assets`.
2. Lấy `publicUrl`.
3. Chèn `publicUrl` vào UniverJS image element.
4. (Optional) Lưu metadata vào bảng `assets`.

## 5. Quy tắc chung
- **RLS (Bảo mật):** Database đã cài sẵn rule. User A không thể query project của User B. Frontend không cần lo filter `where user_id = ...` quá kỹ, Supabase tự chặn.
- **Realtime:** Nếu cần tính năng collab (nhiều người sửa), hãy bật `supabase.channel` lắng nghe bảng `projects`.
