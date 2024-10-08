import { Button } from '@/components/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

interface PaginationProps {
  totalItems: number | string
  handlePrevious: () => void
  handleNext: () => void
  ITEMS_PER_PAGE: number
  currentPage: number
  totalPages: number
}

function Pagination({
  totalPages,
  currentPage,
  totalItems,
  handleNext,
  handlePrevious,
  ITEMS_PER_PAGE,
}: PaginationProps) {
  const renderItemCount = () => {
    const numTotalItems = Number(totalItems)
    if (numTotalItems === 0) {
      return '0 of 0'
    }
    const start = 1
    const end = Math.min(ITEMS_PER_PAGE, numTotalItems)

    return `${start}-${end} of ${numTotalItems}`
  }

  return (
    <div className="flex justify-between items-center gap-4 mx-4 my-3">
      <div className="flex items-center gap-2">
        <div className="text-gray-500 text-sm">
          Showing&nbsp;
          <span className="text-base font-medium">
            {renderItemCount()}
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          variant="primary"
          disabled={currentPage === 1}
          iconBefore={<ArrowLeft className="w-4 h-4" color="white" />}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          disabled={currentPage === totalPages}
          iconAfter={<ArrowRight className="w-4 h-4" color="white" />}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination
