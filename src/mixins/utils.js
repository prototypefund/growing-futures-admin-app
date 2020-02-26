export const utils = {
  name: 'Utils',
  methods: {
    $jsonCopy(src) {
        return JSON.parse(JSON.stringify(src))
    }
  }
}
