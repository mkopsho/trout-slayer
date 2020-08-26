class SessionsController < ApplicationController
  def index
  end

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      render json: user, except: [:email, :password_digest, :created_at, :updated_at]
    else
      # To do: handle this error in the frontend
      render json: {status: "error", message: "Invalid credentials. Please try again."}
    end
  end

  def destroy
    session.clear
    render json: {status: "success", message: "Session cleared."}
  end
end