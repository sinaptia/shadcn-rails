module Components::TimePickerHelper
  def render_time_picker(name:, id: nil, value: 'Pick a time', ampm: true, **options)
    render partial: "components/ui/time_picker", locals: {
      name:,
      value:,
      id:,
      options: options
    }
  end
end
