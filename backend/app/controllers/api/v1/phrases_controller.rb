class Api::V1::PhrasesController < ApplicationController
  def index
    phrases = Phrase.where(user_id: current_api_v1_user.id)

    render json: { status: 200, phrases: phrases }
  end

  def show
    phrases = Phrase.where(user_id: current_api_v1_user.id).order("RAND()")

    render json: { status: 200, phrases: phrases }
  end

  def create
    phrase = Phrase.new(prhase_params)

    if phrase.save
      render json: {status:200, message:phrase}
    else
      render json: {status: 500, message: "作成に失敗しました"}
    end
  end

  def update
    phrase = Phrase.find(update_params[:id])
    if phrase.update(update_params)
      render json: { status: 'SUCCESS', message: 'Updated the post', data: phrase }
    else
      render json: { status: 'ERROR', message: 'Not updated', data: phrase.errors }
    end
  end

  def destroy
    phrase = Phrase.find(params[:id])
    if phrase.destroy
      render json: '削除に成功しました', status: 200
    else
      render json: '削除に失敗しました', status: 500
    end
  end

  private

  def prhase_params
    params.permit(:user_id, :english, :japanese)
  end

  def update_params
    params.permit(:id, :english, :japanese)
  end

end
