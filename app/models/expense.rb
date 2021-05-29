class Expense < ApplicationRecord
  belongs_to :category

  def index_hash
      {
          id: id,
          title: title,
          description: description,
          value: value,
          date: date,
          categoryId: category.id
      }
  end
end
