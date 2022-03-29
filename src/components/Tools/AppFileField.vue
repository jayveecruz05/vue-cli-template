<template>
  <v-text-field class="app-file-field" ref="appFileField" autocomplete="off" type="file" :accept="accept" solo flat outlined :color="color" :height="height" :disabled="disabled" :error-messages="file.error" :rules="((file.model) ? [] : rules)" @input.native="inputFile">
    <template v-slot:prepend-inner>
      <v-icon v-if="(clearable && file.model)" class="clear" @click="clear">mdi-close</v-icon>
      <slot v-if=(!file.model) name="file-input">
        <div class="wrapper flex-column flex-md-row pa-5">
          <div class="d-flex flex-column flex-md-row align-center">
            <v-icon class="file-icon">mdi-file</v-icon>
            <span class="text-center text-body-1 pa-4">Drag and Drop file or Browse</span>
          </div>
          <v-btn class="ma-2" outlined>Upload File</v-btn>
        </div>
      </slot>
      <slot v-else name="file-output">
        <div class="wrapper flex-column flex-md-row pa-5">
          <div class="file-holder flex-column flex-md-row align-center">
            <v-icon class="file-icon">mdi-file</v-icon>
            <div class="text-center text-md-left pa-4">
              <p class="ma-0 text-body-1">Added File</p>
              <p class="ma-0 text-body-2">{{ file.model.name }}</p>
            </div>
          </div>
          <div class="fill-width d-flex flex-column flex-md-row">
            <v-btn class="ma-2" outlined>Replace file</v-btn>
          </div>
        </div>
      </slot>
    </template>
  </v-text-field>
</template>

<script>
  export default {
    name: 'app-file-field',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: { type: Object, default: () => ({ model: undefined, content: undefined, error: undefined }), required: false },
      accept: { type: String, default: '', required: false },
      dimensions: { type: String, default: '', required: false },
      fileSize: { type: Number, default: undefined, required: false },
      rules: { type: Array, default: () => ([]), required: false },
      height: { type: [ String, Number ], default: '', required: false },
      color: { type: String, default: 'primary', required: false },
      clearable: { type: Boolean, default: false, required: false },
      disabled: { type: Boolean, default: false, required: false }
    },
    data() {
      return {
        file: { model: undefined, content: undefined, error: undefined, ...this.value }
      };
    },
    watch: {
      value(to) { this.file = to; }
    },
    methods: {
      inputFile(event) {
        // console.log({ event, file: this.file, dimensions: this.dimensions });
        if (event.target.files[0]) { // Input File Check
          if (!this.accept || this.accept.replace(/\s/ig, '').split(',').includes(event.target.files[0]?.type)) { // File Type Check
            if (!this.fileSize || (this.fileSize && event.target.files[0].size <= Number(this.fileSize))) { // File Size Check
              this.file.error = undefined;
              this.file.model = event.target.files[0];
              const fileReader = new FileReader();
                    fileReader.onload = (frEvent) => {
                      this.file.content = frEvent.target.result;
                      if (/image/ig.test(this.file.model?.type)) {
                        let image = new Image();
                            image.onload = () => {
                              if (this.dimensions) {
                                let [ dWidth, dHeight ] = this.dimensions.split('x'),
                                    { width, height } = image;
                                // console.log(parseInt(dWidth), parseInt(dHeight));
                                // console.log(width, height);
                                if (width != parseInt(dWidth) || height != parseInt(dHeight)) {
                                  this.file.error = 'Invalid image dimensions.';
                                }
                              }
                            };
                        image.src = frEvent.target.result;
                      }
                      this.$emit('input', this.file);
                    }
              if (/image/ig.test(this.file.model?.type)) {
                fileReader.readAsDataURL(this.file.model); // convert to base64 string
              } else if (/text/ig.test(this.file.model?.type)) {
                fileReader.readAsText(this.file.model); // read as text
              } else {
                this.file.content = event.target.value;
                this.$emit('input', this.file);
              }
            } else {
              this.file.error = 'Invalid file size.';
              this.file.model = undefined;
              this.file.content = undefined;
              this.$emit('input', this.file);
            }
          } else {
            this.file.error = 'Invalid file type.';
            this.file.model = undefined;
            this.file.content = undefined;
            this.$emit('input', this.file);
          }
        }
      },
      clear() {
        this.$refs?.appFileField?.clearableCallback();
        this.file.error = undefined;
        this.file.model = undefined;
        this.file.content = undefined;
        this.$emit('input', this.file);
      }
    },
    created() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .app-file-field {
    &.v-text-field--outlined {
      .v-input__slot {
        fieldset {
          border-style: dashed;
          border-width: 1.5px;
        }
      }
    }

    &.v-input--is-focused, &.error--text {
      .v-input__slot {
        .v-input__prepend-inner {
          .v-icon {
            caret-color: inherit;
            color: inherit;
          }

          .v-btn {
            caret-color: inherit;
            color: inherit;
          }
        }
      }
    }

    &.theme--light {
      &.v-input {
        caret-color: rgba(0, 0, 0, 0.54);
        color: rgba(0, 0, 0, 0.54);
      }

      .v-icon {
        caret-color: rgba(0, 0, 0, 0.54);
        color: rgba(0, 0, 0, 0.54);
      }

      .v-btn {
        caret-color: rgba(0, 0, 0, 0.54);
        color: rgba(0, 0, 0, 0.54);
      }
    }

    &.theme--dark {
      &.v-input {
        caret-color: #FFFFFF;
        color: #FFFFFF;
      }

      .v-icon {
        caret-color: #FFFFFF;
        color: #FFFFFF;
      }

      .v-btn {
        caret-color: #FFFFFF;
        color: #FFFFFF;
      }
    }

    &.v-input {
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .v-icon {
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .v-btn {
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .v-input__slot {
      padding: 0 !important;
      overflow: hidden;

      .v-input__prepend-inner {
        width: 100%;
        height: var(--height, 100%);
        margin: 0;
        padding: 10px;
        justify-content: center;
        align-items: center;

        .wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          .file-holder {
            display: flex;
            align-items: center;
          }
        }

        .v-image {
          margin: 0 auto;
          max-width: 100%;
          width: var(--width, 100%);
          height: var(--height, 100%);

          .v-image__image {
            background-size: var(--background-size, contain);
          }
        }

        .image-placeholder {
          margin: 0 auto;
          max-width: 100%;
          width: var(--width, 100%);
          height: var(--height, 70px);
          background-color: #F7F9FD;
          border: 1px dashed #D2D6E2;
        }

        .action {
          position: relative;
          z-index: 1;
        }

        .z-index-top {
          z-index: 1;
        }

        .file-icon {
          font-size: 50px;
        }

        .clear {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          z-index: 1;
        }
      }

      .v-text-field__slot {
        position: absolute !important;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        opacity: 0;

        input {
          max-height: initial;
          width: 100%;
          height: 100%;
          padding: 0;
          cursor: pointer;
        }
      }
    }
  }
</style>