class Image < Model
  include Paperclip::Glue

  has_attached_file :avatar,
                    styles: { medium: '300x300>', thumb: '100x100>' },
                    default_url: '/assets/:style/generic_product.png'

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/
end
