# Prueba de Frontend en Global 66

Al principio considere usar _vue-router_ para manejar el estado de las vistas, pero como iban a ser solo dos y no tenía que persistir el estado, use el api de HTML5 _history_, con eso pude cambiar de vistas. En el caso de los componentes _Modal_ y _Toast_ si use componentes que ya había hecho previamente (para realizarlos tome la inspiración de [https://buefy.org/](Buefy)) aunque los modifique para usarlos dentro del proyecto.

## Sobre los estilos Css

Opte por no usar librerías, salvo por [https://necolas.github.io/normalize.css/](normalize) que use para limpiar los estilos de los navegadores, use sass como pre-procesador para escribir estilos más rápido aunque no use sus funciones como _mixins_. Use las medidas relativas como rem y em para fuentes y espacios entre bloques, pero para algunas sombras y animaciones opte por pixeles por ajustes visuales.

No use variables css por que la página presentaba pocos colores y de haber cambios se podían realizar con sass. También opte por no poner los estilos en cada archivo `.vue` para generar solo un archivo css final, como los componentes no se usaran en otra aplicación y el sitio es sencillo, me pareció mejor idea que la página solo cague un archivo css.

## Sobre el store (Vuex) y llamadas al API

Decidí centrar todas las llamadas al API en el store y como no era necesario tener todos los datos de detalle de los pokemos dentro de la reactividad de vue, los agregue usando el Object.freeze con eso creo que mejore un poco el desempeño de la aplicación. La carga de data se hace a demanda por el evento de _scroll_ de la página, búsqueda o llamada al detalle, los favoritos también persisten por el _localStorage_ del navegador.

Para las llamadas al api use _fetch_, por se nativo en todos los navegadores modernos, pero lo puse dentro de otra función por si en algún momento del desarrollo tenía que cambiarlo por otras librerías como _axios_.

## Sobre los Iconos e Imagenes

Al ser pocos iconos decidí ponerlos dentro de símbolos de un svg, dejarlo dentro del html para no hacer otra llamada y luego convocarlos a lo largo del documento, de esa forma podía alterar sus propiedades internas como fill y stroke. Para el resto de imágenes si decidí usarlas con el atributo src del tag `<img>`.
