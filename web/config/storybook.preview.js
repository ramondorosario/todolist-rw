
const preview = {
  parameters: {
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#1A191B',
        },
      ],
    },
  },
}

export default preview

export const decorators = [
  (Story) => (
    <div className="border-1 min-h-screen">
      <Story />
    </div>
  ),
]
