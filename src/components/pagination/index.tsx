type Props = {
  gotoNextPage: (() => void) | null;
  gotoPrevPage: (() => void) | null;
};

export const Pagination: React.FC<Props> = ({ gotoNextPage, gotoPrevPage }) => {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  );
};
Pagination.displayName = "Pagination";
