<template>
  <div class="row dashboard-info-widgets">
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-success">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{aceito}}
            </div>
            <div class="stats-title">RESPOSTAS CERTAS</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-warning">
        <div class="danger-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <i class="ion ion-android-people stats-icon icon-wide"></i>
              {{sintax}}
            </div>
            <div class="stats-title text-center">ERRO DE SINTAX</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-danger">
        <div class="danger-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <i class="ion ion-android-people stats-icon icon-wide"></i>
              {{erro}}
            </div>
            <div class="stats-title">RESPOSTAS ERRADAS</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6 col-xl-3">
      <vuestic-widget class="info-widget brand-info">
        <div class="danger-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <i class="ion ion-android-people stats-icon icon-wide"></i>
              {{envios}}
            </div>
            <div class="stats-title text-center">ENVIADOS</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-info-widgets',
    props: {
      aceito: {required: true},
      sintax: {required: true},
      erro: {required: true},
      envios: {required: true}
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .stats-number, .stats-title {
    line-height: 1;
  }

  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    &.has-chart {
      justify-content: space-between;
    }

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .brand-warning {
    background: #ffe718;
  }

  .brand-success {
    background: #169208;
    color: white;
  }

  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 2.625rem;
    margin-bottom: 0.5rem;

    .stats-icon {
      font-size: 1.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.25rem;

      &.icon-wide {
        left: -1.875rem;
      }
    }
  }

</style>
