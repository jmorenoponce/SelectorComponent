# SelectorComponent

## Don't forget
    - https://es.javascript.info/task/spy-decorator
    
    - https://www.30secondsofcode.org/articles/s/javascript-array-comparison
    
    - https://www.youtube.com/watch?v=3AIT1RdLprg
    
    - Luis Fernández: El Proceso Unificado de Desarrollo aplicado al Desarrollo de Software del sector DEFENSA Y ESPACIO 
        https://www.youtube.com/watch?v=mqGSnjJBM7Y

    
## Primer vistazo a Vite 
    - Levanta su propio servidor de desarrollo en un puerto configurable.
    
    - Se basa en el funcionamiendo del dev server, prepara un index.html para desarrollo con ES Modules 
    y otro index diferente para producción con el bundle terminado.
    
    - Empaqueta el Css automáticamente si lo importas en el .js
    
    - El concepto es orientado a componentes igual que Vue, React, etc...
    
    - Mete una porción de código en tiempo de desarrollo "refreshRuntime" que actualiza los cambios en
     tiempo real en el navegador, también carga el bundle con un timestamp para evitar la caché del navegador.
     
    - No necesitas ni siquiera un vite.config.js inicial, hace el bundle automático con los imports de ES Modules.
    
    - Levanta una estructura.... <src>, <public>, <dist>, <node_modules> básica, donde lleva a <dist> el bundle final para producción con el contenido de <public>.
    
    - <vite run "preview"> bundeliza producción en un dev server.
    
    - Puedes tener un archivo .ENV para la configuración de desarrollo y producción.
    
    - Tira de PostCss, La importación de archivos .css inyectará su contenido en la página a través de una etiqueta <style> con soporte HMR (Reemplazo de módulo en caliente)

    
## Punteros UX
### Selector
	ux-selector-native-field 
	
	ux-selector-input
	ux-selector-input-field
    ux-selector-selections-list

	ux-selector-dropdown-trigger
	ux-selector-dropdown

	ux-selector-search-field

	ux-selector-view-ungrouped
	ux-selector-view-grouped	
	ux-selector-view-expanded

	ux-selector-results-selected
	ux-selector-results
	
	ux-selector-result-item
	ux-selector-group-item

### Popover
	ux-popover-trigger
