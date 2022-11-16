import React from "react";

export default function ExperienceForm({
    data,
    setInputExp,
    deleteInputExp,
    index,
}) {
    return (
        <form className="mb-3 border p-3">
            <div className="mb-3">
                <label htmlFor="position" className="form-label">
                    Posisi
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="position"
                    placeholder="Masukkan posisi"
                    value={data.position}
                    onChange={(e) => setInputExp(e, index)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="company" className="form-label">
                    Perusahaan
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="company"
                    placeholder="Masukkan nama perusahaan"
                    value={data.company}
                    onChange={(e) => setInputExp(e, index)}
                />
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="start_date" className="form-label">
                            Tanggal mulai
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            placeholder="Masukkan tanggal mulai"
                            value={data.start_date ? data.start_date.slice(0, 10) : ""}
                            onChange={(e) => setInputExp(e, index)}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="end_date" className="form-label">
                            Tanggal berakhir
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            placeholder="Masukkan tanggal berakhir"
                            value={data.end_date ? data.end_date.slice(0, 10) : ""}
                            onChange={(e) => setInputExp(e, index)}
                        />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Deskripsi
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    placeholder="Masukkan deskripsi pekerjaan"
                    value={data.description}
                    onChange={(e) => setInputExp(e, index)}
                    cols="30"
                    rows="5"
                ></textarea>
            </div>
            <div className="btn bg-purple text-white" onClick={() => deleteInputExp(index)}>
                Delete
            </div>
        </form>
    );
}