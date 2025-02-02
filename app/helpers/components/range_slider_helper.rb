module Components::RangeSliderHelper
  def render_range_slider(name:, value: [], id: nil, **options)
    render "components/ui/range_slider", value:, id:, name:, options:
  end
end
