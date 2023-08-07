import { Button } from "antd";
import './Pagination.css'
const Pagination = ({ setCurrentPage, currentPage, totalPages, onPageChange }: any) => {
    const handlePreviousPage = () => {
        onPageChange(currentPage - 1);

    };

    const handleNextPage = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div className="pagination">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1} type="primary">Atras</Button>
            <span>{`${currentPage} / ${totalPages}`}</span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages} type="primary">Siguiente</Button>
        </div>
    );
};

export default Pagination;
