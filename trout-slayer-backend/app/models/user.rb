class User < ApplicationRecord
  has_many :markers
  has_secure_password
  validates :username, :email, presence: true
  validates :username, uniqueness: true

  # Add an oauth class method here
end