export default function SanPhamThem() {
    return (
        <div>
            <h1>Thêm sản phẩm mới</h1>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Tên Sản phẩm</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Hình ảnh</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
        </div>
    )
}