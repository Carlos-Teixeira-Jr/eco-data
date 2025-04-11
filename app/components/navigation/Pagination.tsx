import NextArrowIcon from "@/app/assets/icons/NextArrowIcon";

interface IPagination {
  endOfRecords: boolean;
  currentPage: number;
  onNextPage: (page: number) => void;
  onPreviousPage: (page: number) => void;
}

export const Pagination = ({
  endOfRecords,
  currentPage,
  onNextPage,
  onPreviousPage,
}: IPagination) => {
  
  /**
   * Handles the action for navigating to the previous page.
   *
   * Checks if the current page is greater than 1 before allowing the navigation.
   * If valid, scrolls the window to the top smoothly and calls the onPreviousPage
   * callback with the decremented page number.
   */
  const handlePrevious = () => {
    if (currentPage <= 1) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPreviousPage(currentPage - 1);
  };

  /**
   * Handles the action for navigating to the next page.
   *
   * Checks if the end of the records has been reached before allowing the navigation.
   * If valid, scrolls the window to the top smoothly and calls the onNextPage
   * callback with the incremented page number.
   */
  const handleNext = () => {
    if (endOfRecords) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNextPage(currentPage + 1);
  };

  return (
    <div className="flex border border-neutral-700 rounded-sm md:mb-3 px-2 gap-2 w-fit justify-between items-center">
      <div
        className={`p-3 ${currentPage === 1 ? "opacity-25" : "cursor-pointer"}`}
        onClick={handlePrevious}
      >
        <NextArrowIcon className="w-6 h-6 rotate-180 transform hover:scale-115 duration-200 ease-in-out" />
      </div>

      <div className="bg-offWhite rounded-sm p-3 w-10 flex justify-center cursor-pointer">
        <h3 className="p-dark text-primary-200">{currentPage}</h3>
      </div>
      <div
        className={`p-3 ${endOfRecords ? "opacity-25" : "cursor-pointer"}`}
        onClick={handleNext}
      >
        <NextArrowIcon className="w-6 h-6 transform hover:scale-115 duration-200 ease-in-out" />
      </div>
    </div>
  );
};

export default Pagination;
