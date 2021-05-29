class Category < ApplicationRecord
    has_many :expenses

    def index_hash
        {
            id: id,
            title: title,
            description: description,
            expenses: expenses.map(&:index_hash)
        }
    end
end
