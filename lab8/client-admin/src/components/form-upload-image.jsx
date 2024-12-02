
export function FormUploadImage({sp, setSp}) {
    console.log("sp in form:", sp)

    const uploadOneImage = (file, fieldFile) => {
        const formData = new FormData();
        formData.append(fieldFile, file);
    
        fetch(`http://localhost:3500/images/upload`, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
        .then(({data}) => {
            setSp({
                ...sp,
                hinh: data["imageUrl"]
            })
        })
    }

    const uploadFile = async(e) => {
        const fileList = e.target.files;
        if(fileList) {
            const file = fileList[0];
            uploadOneImage(file, "thumbnail");
        }
    };

    return (
        <div className="mx-auto w-25 btn btn-primary form-upload">
            <input 
                type="file" 
                id="file" 
                className="sr-only" 
                onChange={(e) => uploadFile(e)}
            />
            <label htmlFor="file" className="rounded-md text-center">
                <span 
                    className="text-white"
                >
                    Upload thumbnail
                </span>
            </label>
        </div>
    )
}