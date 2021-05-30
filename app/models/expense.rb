class Expense < ApplicationRecord
  belongs_to :category

  validates :title, presence: true
  validates :date, presence: true
  validates :value, presence: true

  def index_hash
      {
          id: id,
          title: title,
          description: description,
          value: value,
          date: date.to_date,
          categoryId: category.id
      }
  end
end
