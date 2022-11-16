import React from "react";

export default function ProjectForm({
    data,
    setInputProject,
    photoChangeHandler,
    onSubmitPhotoProject,
    deleteInputProject,
    index,
    // error = null,
}) {
    return (
        <form className="mb-3 border p-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Masukkan title portofolio"
                    value={data.title}
                    onChange={(e) => setInputProject(e, index)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="app_type" className="form-label">
                    Jenis Aplikasi
                </label>
                <select
                    className="form-select"
                    id="app_type"
                    value={data.app_type}
                    onChange={(e) => setInputProject(e, index)}
                >
                    <option value="Web">Web Application</option>
                    <option value="Mobile">Mobile Application</option>
                    <option value="Desktop">Desktop Application</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="repo" className="form-label">
                    Link Repositori Github
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="repo"
                    placeholder="Masukkan repositori github"
                    value={data.repo}
                    onChange={(e) => setInputProject(e, index)}
                />
            </div>
            {/* <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                    Photo
                </label>
                <input
                    type="file"
                    className="form-control"
                    onChange={photoChangeHandler}
                />
                <button
                    className="btn mt-3 text-white w-25"
                    style={{ backgroundColor: "#5E50A1" }}
                    onClick={onSubmitPhotoProject}
                >
                    Simpan Foto
                </button>
            </div> */}
            <div className="btn bg-purple text-white" onClick={() => deleteInputProject(index)}>
                Delete
            </div>
        </form>
    );
}