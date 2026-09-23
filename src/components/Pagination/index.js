const Pagination = ({page, totalPages, onChange}) => (
  <div className="pagination">
    <button
      type="button"
      disabled={page <= 1}
      onClick={() => onChange(page - 1)}
    >
      Prev
    </button>

    <p className="page-number">{page}</p>

    <button
      type="button"
      disabled={page >= totalPages}
      onClick={() => onChange(page + 1)}
    >
      Next
    </button>
  </div>
)

export default Pagination
