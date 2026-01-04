export default function ImagePickerLogo({ value, onChange }) {

    const imagenes = [
        "logo1.png",
        "logo2.png",
        "logo3.png",
        "logo4.png",
        "logo5.png",
    ];

    return (
        <div className="image-picker">
            {imagenes.map(img => (
                <img
                    key={img}
                    src={img}
                    alt={img}
                    className={`image-item ${value === img ? "selected" : ""}`}
                    onClick={() => onChange(img)}
                />
            ))}
        </div>
    );
}