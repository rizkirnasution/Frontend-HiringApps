const Pagination = ({ workerPerPage, totalWorker, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalWorker / workerPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination" role='button'>
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
