export const Pagination = ({offset, setOffset, limit}) => {
    const prev = () => {
        if(offset > limit) {
            setOffset(offset - limit);
        }
    }
    const next = () => {
        setOffset(offset + limit);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" onClick={prev}>Previous</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={() => setOffset(limit + 1)}>1</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={() => setOffset(2*limit + 1)}>2</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={() => setOffset(3*limit + 1)}>3</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={next}>Next</button>
                </li>
            </ul>

        </nav>
    )
}