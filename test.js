// Possible tile types
const TILE_TYPES = {
    0: { name: 'Sea', color: 'lightBlue' },
    1: { name: 'Land', color: 'wheat' }
  }
  
  // Map tile data
  const mapData = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  ]
  
  /**
    Tile class
   */
  class Tile {
    
    constructor (size, type, ctx) {
      this.size = size
      this.type = type
      this.ctx = ctx
    }
    
    draw (x, y) {
      // Store positions
      const xPos = x * this.size
      const yPos = y * this.size
  
      // Draw tile
      this.ctx.fillStyle = this.type.color
      this.ctx.fillRect(xPos, yPos, this.size, this.size)
    }
  }
  
  /**
    Map class
   */
  class Map {
  
    constructor (selector, data, opts) {
      this.canvas = document.getElementById(selector)
      this.ctx = this.canvas.getContext('2d')
      this.data = data
      this.tileSize = opts.tileSize
      this.showGrid = false
    }
    
    draw () {
      // Clear canvas before redrawing
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    toggleGrid () {
      // Toggle show grid option
      this.showGrid = !this.showGrid
      
      // Redraw map
      this.draw()
    }
  }
  
  /**
    OrthogonalMap class
   */
  class OrthogonalMap extends Map {
  
    constructor (selector, data, opts) {
      super(selector, data, opts)
      this.draw()
    }
    
    draw () {
      super.draw() // Call draw() method from Map class
  
      const numCols = this.data[0].length
      const numRows = this.data.length
      
      // Iterate through map data and draw each tile
      for (let y = 0; y < numRows; y++) {
        for (let x = 0; x < numCols; x++) {
  
          // Get tile ID from map data
          const tileId = this.data[y][x]
          
          // Use tile ID to determine tile type from TILE_TYPES (i.e. Sea or Land)
          const tileType = TILE_TYPES[tileId]
  
          // Create tile instance and draw to our canvas
          new Tile(this.tileSize, tileType, this.ctx).draw(x, y)
  
          // Draw an outline with coordinates on top of tile if show grid is enabled
          if (this.showGrid) {
            this.drawGridTile(x, y)
          }
        }
      }
    }
    
    drawGridTile (x, y) {
      // Store positions
      const xPos = x * this.tileSize
      const yPos = y * this.tileSize
  
      // Draw coordinate text
      this.ctx.font = '14px serif'
      this.ctx.textAlign= 'center'
      this.ctx.fillStyle = '#333'
      this.ctx.fillText(x + ', ' + y, xPos + this.tileSize / 2, yPos + this.tileSize / 2 + 5)
  
      // Draw grid
      this.ctx.strokeStyle = '#999'
      this.ctx.lineWidth = 0.5
      this.ctx.strokeRect(xPos, yPos, this.tileSize, this.tileSize)
    }
  }
  
  // Init canvas tile map on document ready
  document.addEventListener('DOMContentLoaded', function () {
  
    // Init orthogonal map
    const map = new OrthogonalMap('orthogonal-map', mapData, { tileSize: 64 })
  
    // Bind click event to show grid checkbox toggle
    const cb = document.getElementById('toggle-grid')
    cb.addEventListener('click', function () {
      map.toggleGrid()
    })
  })
  