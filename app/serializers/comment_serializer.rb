class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :post_id, :author_id, :author_name

  def author_name

    author = User.find(self.author_id)
    author.email
  end




end