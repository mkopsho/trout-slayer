class SessionsController < ApplicationController
  def index
  end

  def create
    binding.pry
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      # To do: handle this session data in the frontend
      render json: user, except: [:password, :created_at, :updated_at]
    else
      # To do: handle this error in the frontend
      render json: {status: "error", message: "Invalid credentials. Please try again."}
    end
  end
end