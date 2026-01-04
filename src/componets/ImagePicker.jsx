import "../assets/css/ImagePicker.css";

export default function ImagePicker({ value, onChange }) {

    const imagenes = [
        "p1.png",
        "p2.png",
        "p3.jpg",
        "p4.jpg",
        "p5.jpg",
        "p6.jpg",
        "p7.jpg",
        "p8.jpg",
        "p9.jpg",
        "p10.jpg",
    ];

    return (
        <div className="image-picker">
            {imagenes.map(img => (
                <img
                    key={img}
                    src={`/productos/${img}`}
                    alt={img}
                    className={
                        value === img
                            ? "image-option image-selected"
                            : "image-option"
                    }
                    onClick={() => onChange(img)}
                />
            ))}
        </div>
    );
}
