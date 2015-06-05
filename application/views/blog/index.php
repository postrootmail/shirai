<div class="blog_entries">
    <h3>記事一覧</h3>
    <dl>
        <?php foreach ($blogEntries as $key => $values) : ?>
        <dd>
            <a href="/blog/detail?id=<?php echo $values->id; ?>">
                <?php echo $values->title; ?>
            </a>
            <p style="text-align:left;">
                <?php echo $values->body; ?>
            </p>
            <p style="text-align:right;">更新日:<?php echo $values->created_at; ?></span>
        </dd>
        <?php endforeach; ?>
    </dl>
</div>