class UsersController < ApplicationController
  def create
    user = User.create(user_params)
    # if user.save
    #   render json: user, except: [:password, :created_at, :updated_at]
    # else
    #   # To do: handle this error in the frontend
    #   render json: {status: "error", message: "That username is already taken. Please try again."}
    # end
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