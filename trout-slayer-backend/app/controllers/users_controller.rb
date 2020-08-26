class UsersController < ApplicationController
  # https://api.rubyonrails.org/classes/ActionController/ParamsWrapper.html
  wrap_parameters :user, include: [:username, :email, :password]

  def create
    user = User.new(user_params)
    if user.save
      render json: user, except: [:password, :created_at, :updated_at]
    else
      # To do: handle this error in the frontend
      render json: {status: "error", message: "That username is already taken. Please try again."}
    end
  end

  def update
  end

  def destroy
  end

  private
  
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end