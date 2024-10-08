'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Button, Input } from '@/components/ui'
import { useProducts } from '@/contexts/'
import { useModal, usePagination } from '@/hooks/'
import { Plus, Trash2 } from 'lucide-react'
import React from 'react'
import DeleteModal from './components/DeleteModal'
import FormModal from './components/FormModal'
import Pagination from './components/Pagination'
import Table from './components/Table'

const tableHeaderArray = ['PRODUCT NAME', 'TECHNOLOGY', 'DESCRIPTION', 'ID', 'PRICE', 'DISCOUNT', 'ACTIONS']
const ITEMS_PER_PAGE = 15

function Products() {
  const { filteredProducts, loading, handleSearchChange } = useProducts()
  const formModalProps = useModal()
  const deleteModalProps = useModal()

  const {
    currentProducts,
    handlePreviousPage,
    totalPages,
    handleNextPage,
    currentPage,
  } = usePagination(filteredProducts, ITEMS_PER_PAGE)

  const isCheckedItems = filteredProducts.some(item => item.isChecked)

  function handleOpenDeleteModal() {
    if (isCheckedItems) {
      deleteModalProps.onOpen()
    }
  }

  return (
    <MainLayout>
      <div className="flex bg-gray-darkest ">
        <div className="w-full">
          <h2 className="text-2xl font-semibold my-4 mx-6">All products</h2>
          <div className="flex justify-between mb-4 mx-5">
            <div className="flex gap-4 items-center">
              <div className="border-r-2 border-opacity-medium pr-4 min-w-96">
                <Input
                  placeholder="Search for product by name"
                  onChange={handleSearchChange}
                />
              </div>
              <button title="Select products to remove"onClick={handleOpenDeleteModal}>
                <Trash2 className="w-6 h-6 hover:cursor-pointer" />
              </button>
            </div>
            <Button
              variant="primary"
              size="md"
              iconBefore={<Plus color="white" />}
              onClick={formModalProps.onOpen}
            >
              Add product
            </Button>
          </div>
          <Table
            products={currentProducts}
            loading={loading}
            tableHeaderArray={tableHeaderArray}
          />
          <Pagination
            totalPages={totalPages}
            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            totalItems={filteredProducts.length}
            handlePrevious={handlePreviousPage}
            handleNext={handleNextPage}
            currentPage={currentPage}
          />
        </div>
        <FormModal modalProps={formModalProps} />
        <DeleteModal deleteModalProps={deleteModalProps} />
      </div>
    </MainLayout>
  )
}

export default Products
