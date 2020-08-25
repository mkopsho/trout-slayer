class ApplicationController < ActionController::API
  def logged_in?
    !!session[:user_id]
  end
end
