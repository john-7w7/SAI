<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SAI</title>

  <!-- Vendor CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

  <!-- Global CSS -->
  <link rel="stylesheet" href="assets/css/global.css">

  <!-- Page CSS (si $pageCss está definido en la página) -->
  <?php if (!empty($pageCss)) : ?>
    <link rel="stylesheet" href="assets/css/<?php echo htmlspecialchars($pageCss, ENT_QUOTES, 'UTF-8'); ?>.css">
  <?php endif; ?>
</head>
