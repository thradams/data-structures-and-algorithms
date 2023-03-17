
```c
#include <stdlib.h>
#include <assert.h>


struct book {
    char title[10];
};

struct book_list_node {
    struct book* data;
    struct book_list_node* next;
};

struct book_list {
    struct book_list_node *head, * tail;
};

void book_list_append(struct book_list* list, struct book* b)
{
    struct book_list_node* node = calloc(1, sizeof(struct book_list_node));
    if (node == NULL) return;

    node->data = b; /*reference*/
    
    if (list->head == NULL) {
        list->head = node;
        list->tail = node;
    }
    else {
        list->tail->next = node;
        list->tail = node;
    }
}

void book_list_destroy(struct book_list* list)
{
    struct book_list_node* it = list->head;
    while (it != NULL) {
        struct book_list_node* next = it->next;
        free(it);
        it = next;
    }
}


int main(int argc, char* argv[])
{
    struct book_list list = { 0 };
    struct book book = { .title = "book1"};
    book_list_append(&list, &book);
    book_list_destroy(&list);
}

```
